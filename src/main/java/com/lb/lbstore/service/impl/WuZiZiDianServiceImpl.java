/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.WuZiZiDianDao;
import com.lb.lbstore.domain.WuZiZiDian;
import com.lb.lbstore.service.WuZiZiDianService;
import java.util.ArrayList;
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
    public List<WuZiZiDian> getAllWuZiZiDians(Integer qy_id) {
        List parameters = new ArrayList();
        parameters.add(qy_id);
        return wuZiZiDianDao.getResult("from WuZiZiDian wuZiZiDian where qy_id=?", parameters.toArray());
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
        if (wuZiZiDian.getState() == 0) {
            wuZiZiDian.setState(-1);
            return wuZiZiDianDao.update(wuZiZiDian);
        } else if (wuZiZiDian.getState() == -1) {
            return wuZiZiDianDao.deleteObjById("wuZiZiDian", id);
        }
        return false;
    }

    @Override
    public int queryRows(HashMap map) {
        List parameters = new ArrayList();
        parameters.add(map.get("qy_id"));
        String sql = "select count(1) from WuZiZiDian where qy_id=?";
        if (map.containsKey("mc")) {
            sql += " and mc like '%?%'";
            parameters.add(map.get("mc"));
        }
        if (map.containsKey("state")) {
            sql += " and state = ?";
            parameters.add(map.get("state"));
        }
        return wuZiZiDianDao.getCount(sql, parameters.toArray());
    }

    @Override
    public List<WuZiZiDian> queryWuZiZiDiansByPage(HashMap map) {
        List parameters = new ArrayList();
        parameters.add(map.get("qy_id"));
        String hql = "from WuZiZiDian where qy_id=?";
        if (map.containsKey("mc")) {
            hql += " and mc like '%?%'";
            parameters.add(map.get("mc"));
        }
        if (map.containsKey("state")) {
            hql += " and state = ?";
            parameters.add(map.get("state"));
        }
        return wuZiZiDianDao.getPageList(hql, parameters.toArray(), Integer.parseInt(map.get("beginRow").toString()), Integer.parseInt(map.get("pageSize").toString()));
    }

    @Override
    public List<WuZiZiDian> getWuZiZiDianByWzlbId(Integer wzlb_id) {
        List parameters = new ArrayList();
        parameters.add(wzlb_id);
        String hql = "from WuZiZiDian where wzlb_id = ?";
        return wuZiZiDianDao.getResult(hql, parameters.toArray());
    }

    @Override
    public boolean existWuZiZiDian(Integer qy_id, Integer id, String mc, String bm) {
        return wuZiZiDianDao.existWuZiZiDian(qy_id, id, mc, bm);
    }

}
