/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.GongYingShangDao;
import com.lb.lbstore.domain.GongYingShang;
import com.lb.lbstore.service.GongYingShangService;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("gongYingShangServiceImpl")
public class GongYingShangServiceImpl implements GongYingShangService {

    @Autowired
    private GongYingShangDao gongYingShangDao;

    @Override
    public GongYingShang getGongYingShangById(Integer id) {
        return (GongYingShang) gongYingShangDao.findObjectById(GongYingShang.class, id);
    }

    @Override
    public List<GongYingShang> getAllGongYingShangs() {
        return gongYingShangDao.getResult("from GongYingShang gongYingShang", null);
    }

    @Override
    public boolean updateGongYingShang(GongYingShang gongYingShang) {
        return gongYingShangDao.update(gongYingShang);
    }

    @Override
    public GongYingShang saveGongYingShang(GongYingShang gongYingShang) {
        int id = gongYingShangDao.save(gongYingShang);
        return (GongYingShang) gongYingShangDao.findObjectById(GongYingShang.class, id);
    }

    @Override
    public boolean deleteGongYingShang(Integer id) {
        GongYingShang gongYingShang = (GongYingShang) gongYingShangDao.findObjectById(GongYingShang.class, id);
        if(gongYingShang.getState() == 0){
            gongYingShang.setState(-1);
            return gongYingShangDao.update(gongYingShang);
        }else if(gongYingShang.getState() == -1){
            return gongYingShangDao.deleteObjById("gongYingShang", id);
        }
        return false;
    }

    @Override
    public int queryRows(HashMap map) {
        String sql = "select (1) from GongYingShang where 1=1";
        if (map.containsKey("mc")) {
            sql += " and mc like '" + map.get("mc") + "'";
        }
        if (map.containsKey("state")) {
            sql += " and state = " + map.get("state");
        }
        return gongYingShangDao.getCount(sql, null);
    }

    @Override
    public List<GongYingShang> queryGongYingShangsByPage(HashMap map) {
        String hql = "from GongYingShang where 1=1";
        if (map.containsKey("mc")) {
            hql += " and mc like '" + map.get("mc") + "'";
        }
        if (map.containsKey("state")) {
            hql += " and state = " + map.get("state");
        }
        return gongYingShangDao.getPageList(hql, null, 1, 20);
    }

}
