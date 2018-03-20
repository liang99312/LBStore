/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.WuZiZiDianDao;
import com.lb.lbstore.domain.WuZiZiDian;
import com.lb.lbstore.service.WuZiZiDianService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("wuZiZiDianServiceImpl")
public class WuZiZiDianServiceImpl implements WuZiZiDianService {

    @Autowired
    private WuZiZiDianDao wuZiZiDianDao;

    @Override
    public WuZiZiDian getWuZiZiDianById(Integer id) {
        return (WuZiZiDian) wuZiZiDianDao.findObjectById(WuZiZiDian.class, id);
    }

    @Override
    public List<WuZiZiDian> getAllWuZiZiDians() {
        return wuZiZiDianDao.getResult("from WuZiZiDian wuZiZiDian", null);
    }

    @Override
    public boolean updateWuZiZiDian(WuZiZiDian wuZiZiDian) {
        return wuZiZiDianDao.update(wuZiZiDian);
    }

    @Override
    public WuZiZiDian saveWuZiZiDian(WuZiZiDian wuZiZiDian) {
        int id = wuZiZiDianDao.save(wuZiZiDian);
        return (WuZiZiDian) wuZiZiDianDao.findObjectById(WuZiZiDian.class, id);
    }

    @Override
    public boolean deleteWuZiZiDian(Integer id) {
        WuZiZiDian wuZiZiDian = (WuZiZiDian) wuZiZiDianDao.findObjectById(WuZiZiDian.class, id);
        if(wuZiZiDian.getState() == 0){
            wuZiZiDian.setState(-1);
            return wuZiZiDianDao.update(wuZiZiDian);
        }else if(wuZiZiDian.getState() == -1){
            return wuZiZiDianDao.deleteObjById("wuZiZiDian", id);
        }
        return false;
    }

    @Override
    public int queryRows(HashMap map) {
        String sql = "select (1) from WuZiZiDian where 1=1";
        if (map.containsKey("mc")) {
            sql += " and mc like '" + map.get("mc") + "'";
        }
        if (map.containsKey("state")) {
            sql += " and state = " + map.get("state");
        }
        return wuZiZiDianDao.getCount(sql, null);
    }

    @Override
    public List<WuZiZiDian> queryWuZiZiDiansByPage(HashMap map) {
        String hql = "from WuZiZiDian where 1=1";
        if (map.containsKey("mc")) {
            hql += " and mc like '" + map.get("mc") + "'";
        }
        if (map.containsKey("state")) {
            hql += " and state = " + map.get("state");
        }
        return wuZiZiDianDao.getPageList(hql, null, 1, 20);
    }

}
